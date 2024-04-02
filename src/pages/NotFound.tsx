import NotFoundImage from "../assets/404NotFound.jpeg";

const NotFound = () => {
  return (
    <div
      className="bg-no-repeat bg-slate-200 bg-cover bg-center h-screen flex justify-center items-center
      bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500"
      style={{ backgroundImage: `url(${NotFoundImage})` }}
    >
      <h1 className="text-7xl text-primary-foreground">Not Found</h1>
    </div>
  );
};

export default NotFound;
