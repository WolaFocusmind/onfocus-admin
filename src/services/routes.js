const axios = require("axios");

const route = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 60000,
})

// ---------------- Auth ---------------------------------------- //

export const login = payload => route.post(`/login`, payload)
export const logout = (headers) => route.get(`/logout`, { headers })

// ---------------- Courses ---------------------------------------- //

export const createCourse = payload => route.post(`/course`, payload)
export const getAllCourses = (params) => route.get(`/admin/course`, { params })
export const updateCourseById = (id, payload) => route.put(`/course/${id}`, payload)
export const getCourseBySlug = slug => route.get(`/course/${slug}`)
export const getCourseById = id => route.get(`/course/get/${id}`)

// ---------------- Category ---------------------------------------- //

export const createCategory = payload => route.post(`/category`, payload)
export const getAllCategories = (params) => route.get(`/category`, { params })
export const deleteCourseFromCategory = (payload) => route.put(`/category/courses/delete`, payload)
export const addCoursesToCategory = (payload) => route.put(`/category/courses/add`, payload)
export const getCategoryBySlug = slug => route.get(`/category/${slug}`)

// ---------------- Teachers ---------------------------------------- //

export const createTeacher = payload => route.post(`/teacher`, payload)
export const getAllTeachers = (params) => route.get(`/teacher`, { params })
export const updateTeacherById = (id, payload) => route.put(`/teacher/${id}`, payload)
export const deleteCourseFromTeacher = (payload) => route.put(`/teacher/courses/delete`, payload)
export const addCoursesToTeacher = (payload) => route.put(`/teacher/courses/add`, payload)
export const getTeacherById = id => route.get(`/teacher/${id}`)

// ---------------- Students ---------------------------------------- //

export const getAllStudents = (params) => route.get(`/student`, { params })
export const getStudentById = id => route.get(`/student/${id}`)

// ---------------- Trash ---------------------------------------- //

export const getTrash = (params) => route.get(`/trash`, { params })
export const deleteTrashById = id => route.delete(`/trash/${id}`)
export const restoreTrashById = id => route.put(`/trash/${id}`)
export const sendToTrash = (payload) => route.post(`/trash`, payload)

// ---------------- Get All ---------------------------------------- //

export const getAll = (entity) => route.get(`/all/${entity}`)
export const updateEntity = (id, entity, payload) => route.put(`/update/${entity}/${id}`, payload)
export const getEvents = () => route.get(`/event`)

const api = {
    login,
    logout,

    createCourse,
    getAllCourses,
    updateCourseById,
    getCourseBySlug,
    getCourseById,

    createCategory,
    getAllCategories,
    addCoursesToCategory,
    deleteCourseFromCategory,

    createTeacher,
    getAllTeachers,
    updateTeacherById,
    deleteCourseFromTeacher,
    addCoursesToTeacher,
    getTeacherById,

    getAllStudents,
    getStudentById,

    getTrash,
    deleteTrashById,
    restoreTrashById,
    sendToTrash,

    getAll,
    getEvents,
    updateEntity
}

export default api