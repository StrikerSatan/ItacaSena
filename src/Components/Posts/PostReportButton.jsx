import React from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@nextui-org/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PostReportButton = ({ postData }) => {
    const generateExcelReport = () => {
        const ws = XLSX.utils.json_to_sheet([postData]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "PostReport");
        XLSX.writeFile(wb, "post_report.xlsx");
    }

    const lista = Object.values(postData);
    const generatePDFReport = () => {

        const dateGenerateReport = new Date().toDateString()

        const doc = new jsPDF();
        doc.autoTable({
            head: [['NickName', 'FullName', 'LastLogin', 'Date', 'content']],
            body: [lista],
            theme: 'grid',
            startY: 20,
            columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 40 }, 2: { cellWidth: 40 }, 3: { cellWidth: 30 } }, // Ajusta la longitud de las celdas aquí
            didDrawPage: (data) => {
                // Encabezado
                doc.setFontSize(12);
                doc.text(`Cookie Social Network                    ${dateGenerateReport}`, data.settings.margin.left, 10);
                // Pie de página
                doc.setFontSize(12);
                doc.text("@Todos los derechos reservados a cookie y asociados", data.settings.margin.left, doc.internal.pageSize.height - 10);
            },
            didDrawCell: (data) => {
                // Personalización de las celdas
            },
            orientation: 'landscape'
        });
        doc.save('post_report.pdf');
    }



    return (
        <Button onClick={generatePDFReport} variant='shadow' color='success' className=' text-white font-bold py-4 w-[150px] m-auto'>
            Generar
        </Button>
    )


}

export default PostReportButton;