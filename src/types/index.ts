import z from "zod";

/** auth schemas */
const authSchema = z.object({
    name: z.string(),
    email: z.email('El email no es válido'),
    current_password: z.string(),
    password: z.string().min(8, 'El password debe tener al menos 8 caracteres'),
    password_confirmation: z.string().min(6, 'El password debe tener al menos 8 caracteres'),
    token : z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: 'Los passwords no coinciden',
});
/**User schemas */
export const userSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    _id: z.string()
});
/**member schemas */
export const memberSchema = userSchema.pick({
    name: true,
    email: true,
    _id: true
});
export const memberSchemas = z.array(memberSchema);

/**Note schemas */
export const noteSchema = z.object({
    _id : z.string(),
    content : z.string().min(1,'El contenido de la nota no puede estar vacío'),
    task : z.string(),
    createdBy : userSchema,
    createdAt : z.string(),
});



/** task schemas */
const taskStatusSchema = z.enum(['pending','onHold','inProgress','underReview','completed']);
export const taskSchema = z.object({
    _id : z.string(),
    name : z.string(),
    description : z.string(),
    project : z.string(),
    status : taskStatusSchema,
    completedBy : z.array(z.object({
        _id : z.string(),
        user: userSchema,
        status: taskStatusSchema
    })),
    notes : z.array(noteSchema),
    createdAt : z.string(),
    updatedAt : z.string()
});

export const taskProjectSchema = taskSchema.pick({
    _id : true,
    name : true,
    status : true,
    description : true
});

/** project schemas */
export const projectSchema = z.object({
    _id : z.string(),
    projectName : z.string(),
    clientName : z.string(),
    description : z.string(),
    manager : z.string(),
    tasks : z.array(taskProjectSchema),
    team : z.array(z.string())
});

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id : true,
        projectName : true,
        clientName : true,
        description : true,
        manager : true
    })
);

export const editProjectSchema = projectSchema.pick({
    clientName : true,
    projectName : true,
    description : true
});

export type Project = z.infer<typeof projectSchema>;
export type projectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>
export type Task = z.infer<typeof taskSchema>;
export type TaskStatus = z.infer<typeof taskStatusSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>;
export type TaskProject = z.infer<typeof taskProjectSchema>;
export type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type checkPasswordForm = Pick<Auth, 'password'>;
export type UserRegisterForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>;
export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, 'name' | 'email'>;
export type UpdatePasswordForm = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>;
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>;
export type ForgotPasswordForm = Pick<Auth, 'email'>;
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>;
export type ConfirmToken = Pick<Auth, 'token'>;
export type TeamMember = z.infer<typeof memberSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>;
export type TeamMembers = z.infer<typeof memberSchemas>;
export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, 'content'>;