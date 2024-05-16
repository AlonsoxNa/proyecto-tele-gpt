import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



export const SelecctorFechas = () => {
  return (
    <div className='container'>
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Selecciona la fecha  " />
        </LocalizationProvider>

    </div>
  )
}
