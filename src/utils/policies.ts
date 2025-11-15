import type { Project, User } from "../types";

export const isManager = (userId:User['_id'], projectManager: Project['manager']) => userId === projectManager; 