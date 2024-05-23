import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid, Button } from '@mui/material';
// import './TablaSimplev2.css'; // Importa tu archivo CSS personalizado
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Noticia } from '@/interfaces/Noticia';

interface Props {
  noticias: Noticia[];
}

export const NoticiasTabla = ( { noticias }: Props ) => {
  return (
    <TableContainer>
      <Table
        sx={ { borderCollapse: 'collapse' } }>
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
          { noticias.map( ( row ) => (
            <TableRow key={ row.id }>
              <TableCell >
                <Grid
                  container
                  alignItems='center'
                  sx={ { backgroundColor: '#DBE3E3', height: '3rem', borderRadius: '0.3rem', px: 2 } }
                >
                  { row.titulo }
                </Grid>
              </TableCell>
              <TableCell>
                <Grid
                  container
                  alignItems='center'
                  sx={ {
                    backgroundColor: '#DBE3E3',
                    height: '3rem',
                    borderRadius: '0.3rem',
                    px: 2
                  } }
                >
                  { row.fechaRegistro }
                </Grid>
              </TableCell>
              <TableCell>

                <Button sx={ { width: 'auto', mx: 1 } } variant="contained" color="error" ><DeleteIcon /></Button>
                <Button sx={ { width: 'auto', mx: 1 } } variant="contained"><RemoveCircleIcon /></Button>
                <Button sx={ { width: 'auto', mx: 1 } } variant="contained"> <ModeEditIcon /> </Button>
              </TableCell>
            </TableRow>
          ) ) }
        </TableBody>
      </Table>
    </TableContainer>
  );
};
