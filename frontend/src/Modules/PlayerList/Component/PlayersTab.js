import {useState} from 'react'
import styles from '../Style/PlayersTab.module.css'
import * as XLSX from 'xlsx';
import { Fileuploader } from './Fileuploader';
import UploadStatus from './UploadStatus';
import TemplateDownload from './templateDownload';
 const Playerstab = () => {
    const [activeTab, setActiveTab] = useState('Status'); 

    const headers = [
      'playername',
      'Playerdob',
      'playermobile',
      'playerrole',
      'tshirtsize',
      'trousersize',
    ];
  
    const data = [headers];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleDownload = ()=>{
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'template.xlsx');
  }

  return (
    <div className={styles['tabs-container']}>
      <div className={styles['tabs']}>
        <div
          data-testid='upload'
          className={`${styles['tab']} ${activeTab === 'Upload' ? styles['active'] : ''}`}
          onClick={() => handleTabClick('Upload')}
        >
          Upload
        </div>
        <div
          data-testid='status'
          className={`${styles['tab']} ${activeTab === 'Status' ? styles['active'] : ''}`}
          onClick={() => handleTabClick('Status')}
        >
          Status
        </div>
        <div
          data-testid='template'
          className={`${styles['tab']} ${activeTab === 'Template' ? styles['active'] : ''}`}
          onClick={() => {handleTabClick('Template');handleDownload()}}
          title='Download Template'
        >
          Template 
        </div>
      </div>
      <div className={styles['tab-content']}>
        {activeTab === 'Upload' && <Fileuploader setActiveTab={setActiveTab}/>}
        {activeTab === 'Status' && <UploadStatus/>}
        {activeTab === 'Template' && <TemplateDownload/> }
      </div>
    </div>
  );
}

export default Playerstab