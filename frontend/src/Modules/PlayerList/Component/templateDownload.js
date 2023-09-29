import React from 'react';
import * as XLSX from 'xlsx';
import xltemplate from '../../../assets/XLtemplate.png'
import styles from '../Style/PlayersTab.module.css'


const TemplateDownload = () => {
  return (
    <div>
      <img src={xltemplate} alt='xlfile' className={styles.xlimage}></img>
    </div>
  );
};

export default TemplateDownload;
