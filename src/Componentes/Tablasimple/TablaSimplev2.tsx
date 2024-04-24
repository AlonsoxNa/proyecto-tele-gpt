import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import './TablaSimplev2.css'; // Importa tu archivo CSS personalizado


export default function TablaSimplev2({ rows, titulos }) {
  return (
    <TableContainer>
      <Table className="custom-table">
        <TableHead>
          <TableRow>
            {titulos.map((titulo) => (
              <TableCell key={titulo}>
                {titulo !== '' ? (
                  <>
                    {titulo}
                    <div className='linea'></div>
                  </>
                ) : (
                  <>
                    {titulo}
                  </>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => {
            let isFirstCell = true; // Variable para rastrear el primer elemento
            return (
              <TableRow key={row.id}>
                {Object.keys(row).map((key) => {
                  if (key === 'id') return null;
                  if (key.startsWith('Boton')) {
                    return (
                      <TableCell key={key}>
                        <button className='btn color-btn' onClick={() => row[key].funcion()}>{row[key].titulo}</button>
                      </TableCell>
                    );
                  }
                  if (key.startsWith('EntradaTexto')) {
                    return (
                      <TableCell key={key}>
                        <input type='text' placeholder={row[key]} />
                      </TableCell>
                    );
                  }
                  const cellClass = isFirstCell ? 'primero container justify-content-center align-items-center d-flex ' : 'd-flex  demas container justify-content-center align-items-center'; // Determina la clase de la celda
                  isFirstCell = false; // Actualiza isFirstCell después de procesar el primer elemento
                  return (
                    <TableCell key={key}>
                      <div className={cellClass}>{row[key]}</div>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
