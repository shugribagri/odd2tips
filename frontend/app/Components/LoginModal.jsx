// LoginModal.jsx

const LoginModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Login Required</h2>
        <p className="mb-4">You must log in or register to send messages.</p>
        <div className="flex flex-col items-stretch space-y-4">
          <a
            href="/login"
            className="text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-150 ease-in-out"
          >
            Log In
          </a>
          <a
            href="/register"
            className="text-center bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-150 ease-in-out"
          >
            Register
          </a>
          <button
            onClick={onClose}
            className="text-center bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-150 ease-in-out"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
