import { useRouteError } from 'react-router-dom';
export default function UnexpectedError() {
  const error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return (
    <div className="h-screen flex justify-center items-center text-4xl">
      Dang!
    </div>
  );
}
