import moment from "moment";

// // Function to calculate the total time dynamically
// export const calculateUpdatedTime = (totalDuration, checkInTime) => {
//   let updatedDuration = moment.duration(totalDuration);

//   // If checkInTime is set, add the duration from checkInTime to now
//   if (checkInTime) {
//     const now = moment();
//     updatedDuration.add(moment.duration(now.diff(checkInTime)));
//   }

//   let formattedTime =  formatTime(updatedDuration)

//   return formattedTime;
// };


export const formatTime = (updatedDuration) => {
   
    // Calculate hours, minutes, and seconds
    const hours = Math.floor(updatedDuration / 3600);
    const minutes = Math.floor((updatedDuration % 3600) / 60);
    const seconds = Math.floor(updatedDuration % 60);
  
    // Format the result as HH:mm:ss
    const formattedTime = [
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0"),
    ].join(":");

    return formattedTime;
}