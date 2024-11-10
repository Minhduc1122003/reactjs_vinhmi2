import axios from 'axios';

const API_BASE_URL = 'http://uat-hrm.reecorp.vn/hrm/api/userv2';

const _apiProvider = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

_apiProvider.interceptors.request.use(
  config => {
    // Bạn có thể thêm token ở đây nếu cần
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Lấy toàn bộ phim
export const getAllMovieView = async () => {
  try {
    const response = await fetch('http://localhost:9011/api/movies/getAllMovieView');

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Có lỗi: " + error);
    throw error;
  }
};

// Lấy phim theo trạng thái
export const getAllMovieViewByStatus = async (statusMovie) => {
  try {
    const response = await fetch(`http://localhost:9011/api/movies/getAllMovieView/${statusMovie}`);

    if (!response.ok) {
      throw new Error("Mạng có vấn đề");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Có lỗi: ", error);
    throw error;
  }
};

// Login
export const login = async (username, password) => {
  try {
    const response = await fetch('http://localhost:9011/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage); // Ném lỗi nếu response không ok
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    throw error; // Ném lại lỗi để xử lý ở nơi gọi
  }
};

// Avt
export const getAvt = async (id) => {
  try {
    const response = await fetch(`http://localhost:9011/api/users/getPhotoById/${id}`);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const data = await response.text();
    console.log(data);
    return data;

  } catch (error) {
    console.error('Lỗi:', error);
    throw error;
  }
}

// Upload avt
export const uploadAvt = async (formData) => {
  try {
    const response = await fetch('http://localhost:9011/api/users/update-avatar', {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update avatar');
    }

    const data = await response.text(); // Giả sử API trả về chuỗi phản hồi, ví dụ "Avatar updated successfully"
    return data;
  } catch (error) {
    console.error('Error updating avatar:', error);
    throw error;
  }
};

// Register
export const registerUser = async (newUser) => {
  try {
    const response = await fetch('http://localhost:9011/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error(`Lỗi: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi xảy ra: ", error);
    throw error;
  }
};

// Update account
export const updateUser = async (id, newUser) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  try {
    const response = await fetch(`http://localhost:9011/api/users/update/${id}`, { // Truyền id qua URL
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser), // Truyền đối tượng User mới
    });

    if (!response.ok) {
      throw new Error("Có lỗi xảy ra khi cập nhật người dùng!");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Lỗi mạng hoặc server!", error);
    throw error;
  }
};

// Logout
export const logout = async () => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  try {
    const response = await fetch('http://localhost:9011/api/logout', {
      method: 'POST',
      headers: headers
    });

    if (!response.ok) {
      throw new Error("Có lỗi xảy ra khi đăng xuất !");
    }

    return response;
  } catch (error) {
    console.error("Lỗi mạng hoặc server !");
    throw error;
  }
};

// Get userDetail
export const userDetail = async (id) => {
  const token = localStorage.getItem('token');
  const header = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(`http://localhost:9011/api/users/getById/${id}`, {
      method: 'GET',
      headers: header
    });

    if (!response) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Lỗi: ', error);
    throw Error;
  }
};

// Get movieDetail
export const movieDetail = async (movieId) => {
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  console.log(user);
  const userId = user ? user.userId : null;
  console.log(userId);

  try {
    const url = `http://localhost:9011/api/movies/getMovieDetail/${movieId}${userId ? `?userId=${userId}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getShowtimeByMovieId = async (id) => {
  try {
    const response = await fetch(`http://localhost:9011/api/showtime/getByMovieId/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getSeatsByShowtimeAndCinemaRoom = async (showtimeId, cinemaRoomId) => {
  try {
    const response = await fetch(`http://localhost:9011/api/seats/showtime/${showtimeId}/cinemaRoom/${cinemaRoomId}`, {
      method: 'GET', // Đổi thành GET
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Kiểm tra phản hồi
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching seats:", error);
    throw error;
  }
};

export const insertBuyTicket = async (buyTicketRequest) => {
  try {
    console.log(buyTicketRequest);
    const response = await fetch('http://localhost:9011/api/buyticket/createBuyTicket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(buyTicketRequest)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      throw new Error(`Server error: ${response.status}`);
    }

    const data = response;
    return data;
  } catch (error) {
    console.error("Error fetching seats:", error);
    throw error;
  }
};

export default _apiProvider;
