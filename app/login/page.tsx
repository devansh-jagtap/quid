export default function LoginPage(){

  return(
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h1 className="text-2xl text-black text-center font-bold mb-6">
          Quid-Invoice Generator
        </h1>
        <button className="bg-black text-2xl rounded-lg w-full py-2 border">
          Sign in with google
        </button>
      </div>
    </div>
  );

}