import http from "../http-common";
const getUsers = () => {
    return http.get("/users");
};
const getUserById = (id) => {
    return http.get(`/users/${id}`);
};
const getAllPosts = () => {
    return http.get("/posts");
}
const getPostById = (id) => {
    return http.get(`/posts/${id}`);
}
const getCommentById = (id) => {
    return http.get(`/posts/${id}/comments`);
}

const TypicodeService = {
    getUsers,
    getUserById,
    getAllPosts,
    getPostById,
    getCommentById
};
export default TypicodeService;