export const CardInfo = ({ text }) => {
         return (
             <div className="relative max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
               <div className="absolute left-0 top-0 bottom-0 w-2 bg-gray-800 rounded-l-xl"></div>
               <div className="md:flex">
                 <div className="p-8">
                   <div className="text-left text-xl font-medium text-black">
                     {text}
                   </div>
                 </div>
               </div>
             </div>
           );
       };
