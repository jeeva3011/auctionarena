import { Injectable } from '@nestjs/common';
import { CreateBulkuploadInput } from './dto/create-bulkupload.input';
import { AwsService } from 'src/aws/aws.service';
import { WorkBook, WorkSheet, writeFile, read, utils, readFile } from 'xlsx';
import { type } from 'os';
import { PlayersService } from 'src/players/players.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { readFileSync } from 'fs';
import { FilehistoryService } from 'src/filehistory/filehistory.service';
import { CategoryService } from 'src/category/category.service';
import { LiveGateway } from 'src/live/live.gateway';
import { AuctionService } from 'src/auction/auction.service';
@Injectable()
export class BulkuploadService {
  constructor(
    private awsservice: AwsService,
    private playerservice: PlayersService,
    private filehistoryservice: FilehistoryService,
    private categoryservice: CategoryService,
    private liveGateWay: LiveGateway,
    private auctionservice: AuctionService
  ) {}

  
  async Excelupload(file: string, auctionid: number, filename: string) {
    // const category = (await this.categoryservice.findAll(auctionid))
    // console.log(category)

    const auction = await this.auctionservice.findOne(auctionid);
    const uploadedExcel = await this.awsservice.readS3File(file);
    const workBookHeaders = read(uploadedExcel['Body'].buffer, {
      sheetRows: 1,
      type: 'buffer',
    });
    // const columnsArray = utils.sheet_to_json(
    //   workBookHeaders.Sheets[workBookHeaders.SheetNames[0]],
    //   {header:1},)[0] as string[];
    const workBook = readFile(uploadedExcel['Body'].buffer);
    const sheet = workBook.Sheets[workBookHeaders.SheetNames[0]];
    const players: CreateBulkuploadInput[] = utils.sheet_to_json(sheet, {
      raw: false, 
      dateNF: 'DD-MM-YYYY', 
    });
    
    
    const invalidPlayers = [];
    const validPlayers = [];
    const playerData = [];

    for (const player of players) {
      let modifiedPlayer = {}; 
      for (let key in player) {
        const newKey = key.toLowerCase().trim(); 
        const value = player[key].trim(); 
        modifiedPlayer[newKey] = value; 
      }
      playerData.push(modifiedPlayer); 
    }
    

    for (const player of playerData) {   

      const playername = player.playername;
      const playerdob = player.playerdob;
      // console.log(this.parseExcelDate(player.playerDOB))
      const Mobilenumber = player.playermobile?.toString();

      const playerError = [];
      if (!playername) {
        playerError.push('PlayerName Required');
      }else if(!/^[A-Z a-z\s]+$/.test(playername)){
        playerError.push("Invalid name")
      }
      if (!Mobilenumber) {
        playerError.push('Mobilenumber required');
      } else if (!/[6-9]\d{9}$/.test(Mobilenumber)) {
        playerError.push('Invalid mobile number');
      } else if( await this.playerservice.findOne(Mobilenumber, auctionid)){
        playerError.push("Mobile number exists");
      }

      if (!playerdob) {
        playerError.push("DOB Required");
      } else {
        const dobDate = new Date(playerdob);
        const currentDate = new Date();
        
        if (isNaN(dobDate.getTime()) || dobDate >= currentDate) {
          playerError.push("Invalid date");
        }
      }
      if(!player.playerrole){
        playerError.push("Player Role Required")
      }
      if(!player.tshirtsize){
        playerError.push("Tshirt Size Required")
      }
      if(!player.trousersize){
        playerError.push("Trouser Size required")
      }
      
      

      if (playerError.length > 0) {
        player.error = playerError.join(', ');
        invalidPlayers.push(player);
      } else {
        
        validPlayers.push(player);
        // await this.playerservice.uploadplayer(player, auctionid);
        // await this.categoryservice.create(categoryInput)
       }
    }
    let errorfilepath;
    if (invalidPlayers.length > 0) {
      const failedPlayerSheet: WorkSheet = utils.json_to_sheet(invalidPlayers);
      const failedPlayerFileName = 'errorfilename.xlsx';
      const failedworkBook: WorkBook = utils.book_new();
      utils.book_append_sheet(
        failedworkBook,
        failedPlayerSheet,
        'FailedPlayerSheet',
      );
      await writeFile(failedworkBook, failedPlayerFileName);
      const fileData = readFileSync(failedPlayerFileName);
      errorfilepath = `errors/${Date.now()}.xlsx`
      await this.awsservice.uploadFile(
        fileData,
        errorfilepath,
      );
     
    }
    const filehistoryInputs={
      auctionid,
      filename,
      errorsrecords: invalidPlayers.length,
      successrecords: (playerData.length)-invalidPlayers.length,
      errorfilepath,
      totalrecords: playerData.length,
      filepath: file
    }
    let fileid;
    try{
      const data = await this.filehistoryservice.create(filehistoryInputs);
      fileid = data.fileid
    }catch(e){
      console.error(e)
    }finally{
      this.liveGateWay.server.emit('file-status',{auctionid:auctionid,message:"file uploaded", fileid:fileid})
    }
     

     console.log(validPlayers)
     for (let i = 0; i < validPlayers.length; i++) {
      const percentage = Math.floor(((i + 1) / validPlayers.length) * 100);
      this.liveGateWay.server.emit('progress-bar', { percentage, auctionid, fileid });
      const cate = await this.categoryservice.findAll(validPlayers[i].playerrole.toLowerCase().trim(),auctionid)
      if(!cate){
        const categoryInput = {
          auctionid,
          category:validPlayers[i].playerrole.toLowerCase().trim(),
          minimumbid:auction.minimumbid
        }
        await this.categoryservice.create(categoryInput)
      }
      await this.playerservice.uploadplayer(validPlayers[i], auctionid);
    }
    if (uploadedExcel) {
      return true;
    } else {
      return false;
    }
  }
}
