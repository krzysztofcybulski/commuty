import { ViewType, updateView } from '../store/appReducer';
import { useAppDispatch } from '../store/store';

interface BackButtonProps {
  view: ViewType;
}

export const BackButton = ({ view }: BackButtonProps) => {
  const dispatch = useAppDispatch();
  const handleGoBackClick = () => {
    dispatch(updateView(view));
  };

  return (
    <button onClick={handleGoBackClick} className=" bg-white -ml-2 mb-4">
      <img width="40px" height="40px" src="../../public/left-chevron.png" />
    </button>
  );
};
