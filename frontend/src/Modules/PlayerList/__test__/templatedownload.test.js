import React from 'react';
import { screen, render, fireEvent } from "@testing-library/react";
import TemplateDownload from '../Component/templateDownload';
import * as XLSX from 'xlsx';

jest.mock('xlsx', () => {
    const originalModule = jest.requireActual('xlsx');
    return {
      ...originalModule,
      utils: {
        ...originalModule.utils,
        aoa_to_sheet: jest.fn(),
        book_new: jest.fn(),
        book_append_sheet: jest.fn(),
        writeFile: jest.fn(),
      },
    };
  });
  

describe('<Templatedownload>', () => {
  test('should render without errors', () => {
    render(<TemplateDownload />);

    expect(screen.getByAltText('xlfile')).toBeInTheDocument();
  });

//   test('should call XLSX functions to export to Excel', () => {
//     render(<TemplateDownload />);

//     fireEvent.click(screen.getByText('Export to Excel'));

//     expect(XLSX.utils.aoa_to_sheet).toHaveBeenCalledWith(expect.any(Array));
//     expect(XLSX.utils.book_new).toHaveBeenCalled();
//     expect(XLSX.utils.book_append_sheet).toHaveBeenCalledWith(
//       expect.any(Object),
//       expect.any(Object),
//       'Template'
//     );
//     expect(XLSX.writeFile).toHaveBeenCalledWith(expect.any(Object), 'template.xlsx');
//   });
});
