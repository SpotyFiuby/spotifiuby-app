import axios from "axios";

const base_twilio_url = 'verify-4424-bflxjx.twil.io';


const sendWhatsappVerification = async (phoneNumber: any) => {
 try {

   const response = await axios.post(`https://${base_twilio_url}/start-verify`, {
    to: phoneNumber,
    channel: "whatsapp",
   },{
      headers: {
        "Content-Type": "application/json",
      },
   });
   if(response.status === 200){
    return response.data.success;
   }
 } catch (error) {
   console.error(error);
   return false;
 }
 return false;
};

const checkVerification = async (phoneNumber: any, code: any) => {
 try {

   const response = await axios.post(`https://${base_twilio_url}/check-verify`, {
    to: phoneNumber,
    code,
   },{
     headers: {
       "Content-Type": "application/json",
     },
   });
   if (response.status === 200) {
      return response.data.success;
    }
   return false;
 } catch (error) {
   console.error(error);
   return false;
 }
};

export { sendWhatsappVerification, checkVerification };