import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleJoinRoom = useCallback(() => {
    if (value.trim()) {
      navigate(`/room/${value}`);
    }
  }, [navigate, value]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleJoinRoom();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Join a Room</h1>
        <input
          type="text"
          className="w-full h-12 px-4 border border-gray-300 rounded-md mb-4"
          placeholder="Enter room code"
          value={value}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button
          type="button"
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={handleJoinRoom}
        >
          Join Room
        </button>
      </div>
    </div>
  );
}

export default Home;
