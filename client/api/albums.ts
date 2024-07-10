import axios from 'axios';

 export  async function fetchAlbum(albumId: any) {
     try {
       const response = await axios.get(process.env.SECRET_HOST + '/albums/' + albumId);
       return response.data;
     } catch (error) {
       console.error('Ошибка при получении данных:', error);
       throw error;
     }
   }
   