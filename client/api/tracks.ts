import axios from 'axios';

 export  async function fetchTrackData(trackId: any) {
     try {
       const response = await axios.get(process.env.SECRET_HOST + '/tracks/' + trackId);

       return response.data;
     } catch (error) {
       // Обработка ошибок
       console.error('Ошибка при получении данных:', error);
       throw error; // Проброс ошибки для обработки на более высоком уровне 
     }
   }
   