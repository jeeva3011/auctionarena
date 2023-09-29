import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { LoginUser } from './dto/login-user.input'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  

  constructor(@InjectRepository(User) private userRepo : Repository<User>){}

  public async create(createUserInput: CreateUserInput):Promise<Boolean> {
    const hash = await bcrypt.hash(createUserInput.password, 10)
     try{
        await this.userRepo.save({
        email: createUserInput.email,
        name: createUserInput.name,
        password: hash,
        phonenumber: createUserInput.phonenumber
      })
      return true
    }catch(error){
      console.log(error)
      return false
    }
  }

  public async login(loginuser: LoginUser): Promise<User> {
    const hash = await bcrypt.hash(loginuser.password, 10)
    const user = await this.userRepo.findOne({relations:["auction","auction.players","auction.team","auction.team.players","auction.files","auction.players.teams","auction.category","auction.category.players"], where: { email: loginuser.email} })
    let isPasswordValid
    if(user)
      isPasswordValid = await bcrypt.compare(loginuser.password, user.password);
    if (!isPasswordValid) {
      const userCopy = new User()
      userCopy.name = "-1"
      userCopy.email = "-1"
      userCopy.password= "-1"
      userCopy.userid = -1
      userCopy.phonenumber = "-1"
      return userCopy
    }   
    else{
      user.password = loginuser.password
    }
    return user
  }

  public async emailVerify(email: string):Promise<Boolean>{
    const user = await this.userRepo.findOne({where:{email:email}})
    return !!user
  }

  public async findAll() {
    return await this.userRepo.find({relations:['auction']})
  }

  public async findOne(id: number) {
    return this.userRepo.findOne({relations:["auction","auction.players","auction.files","auction.players.teams","auction.team","auction.team.players","auction.category","auction.category.players"],where:{userid:id}})
  }

  public async update(email: string, updateUserInput: UpdateUserInput):Promise<Boolean> {
    try{
      const user = await this.userRepo.findOne({where:{email:email}})
      const hash = await bcrypt.hash(updateUserInput.password, 10)
      user.password = hash
      await this.userRepo.save(user)
      return true
    }catch(error){
      console.log(error)
      return false
    }
    
  }

  remove(id: number) {
    return this.userRepo.softDelete(id)
  }

}
