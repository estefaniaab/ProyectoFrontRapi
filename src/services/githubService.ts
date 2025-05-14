const CLIENT_ID = import.meta.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:5173/callback"; // Hacia donde se redirige despues del login


class githubService {
    // Redirigir a Github
    loginWithGitHub() {
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
    }

    getTokenFromURL() {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
    }

    async getUserData(token: string) {
        try{
            const response = await fetch("https://api.github.com/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/vnd.github.v3+json",
                },
            });

            if (!response.ok) {
              throw new Error(`GitHub API error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching user data:", error);
            return null;
        }
    }

    logout() {
        localStorage.removeItem("github_token");
    }


}



