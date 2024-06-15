export const StatisticCell = ({ imageUrl, value, unit, description }) => {
               return (
                   <div className="relative w-36 h-36 max-w-sm rounded-xl overflow-hidden shadow-lg bg-white p-6">
                     <div className="font-black text-2xl">
                       {value} {unit}
                     </div>
                     <p className="text-gray-500 text-xs mb-2">{description}</p>
                     <img className="absolute bottom-0 right-0 w-14 h-14 mr-1 mb-2" src={imageUrl} alt={description} />
                   </div>
                 );
             };
