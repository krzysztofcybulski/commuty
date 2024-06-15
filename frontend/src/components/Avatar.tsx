export const Avatar = ({ imageUrl }) => {
         return (
           <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
             <img className="w-full h-full object-cover" src={imageUrl} alt="Avatar" />
           </div>
         );
       };