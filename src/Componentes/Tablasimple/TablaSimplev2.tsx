import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import './TablaSimplev2.css'; // Importa tu archivo CSS personalizado



interface Rows{
  id:number;
  Noticia: string;
  Fecha: string;
}

interface TableSimplev2{
  rows:Rows[];
}

export default function TablaSimplev2({ rows}:TableSimplev2) {
  return (
    <TableContainer>
      <Table className="custom-table">
        <TableHead>
          <TableRow>
              <TableCell>
                Noticia
              </TableCell>
              <TableCell>
                Fecha
              </TableCell>
              <TableCell>
                Acciones
              </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
              <TableRow key={row.id}>
                    <TableCell className=''>
                      <div className='primero container justify-content-center align-items-center d-flex'>
                      {row.Noticia}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='d-flex  demas container justify-content-center align-items-center'>
                      {row.Fecha}
                      </div>
                    </TableCell>
                    <TableCell className=''>
                      <button className='btn color-btn'>Eliminar</button>
                      <button className='btn color-btn'>Ocultar</button>
                      <button className='btn color-btn'>Modificar</button>
                    </TableCell>
                
                {/* {Object.keys(row).map((key) => {
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
                })} */}
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
