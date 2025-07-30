export async function login(username, password) {
    const response = await fetch('http://localhost:8080/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    console.log("Response from login : ",response);
    
    if (response.ok) {
        const data = await response.json();
        console.log("data from login ",data);
        
        localStorage.setItem('jwtToken', data.jwtToken);
        localStorage.setItem('username', data.username);
        localStorage.setItem('roles', JSON.stringify(data.roles));
        return data;
    } else {
        const error = await response.json();
        throw new Error(error.Message || 'Login failed');
    }
}

export async function register(username, password, role) {
    const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
    });

    console.log(response);
    
}

export function logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('roles')
    localStorage.removeItem('username')
    window.location.href = '/login';
}

export function isLoggedIn() {
    return !!localStorage.getItem('jwtToken');
}

export async function makeAuthenticatedRequest(url, options = {}) {
    const token = localStorage.getItem('jwtToken');
    if (!token) throw new Error('No authentication token found. Please login.');

    console.log("Options : ",options);
    
    const authenticatedOptions = {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    };

    console.log("authenticatedOptions : ",authenticatedOptions);
    
    const response = await fetch(url, authenticatedOptions);

    if (response.status === 401) {
        localStorage.clear();
        throw new Error('Authentication expired. Please login again.');
    }

    return response;
}

