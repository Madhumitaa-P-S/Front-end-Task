export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  return { isValid: true };
};

export const validateUsername = (username: string): { isValid: boolean; message?: string } => {
  if (username.length < 3) {
    return { isValid: false, message: 'Username must be at least 3 characters long' };
  }
  if (username.length > 30) {
    return { isValid: false, message: 'Username cannot exceed 30 characters' };
  }
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return { isValid: false, message: 'Username can only contain letters, numbers, and underscores' };
  }
  return { isValid: true };
};

export const validateRequired = (value: string, fieldName: string): { isValid: boolean; message?: string } => {
  if (!value || value.trim().length === 0) {
    return { isValid: false, message: `${fieldName} is required` };
  }
  return { isValid: true };
};

export const validateName = (name: string, fieldName: string): { isValid: boolean; message?: string } => {
  const required = validateRequired(name, fieldName);
  if (!required.isValid) return required;
  
  if (name.length > 50) {
    return { isValid: false, message: `${fieldName} cannot exceed 50 characters` };
  }
  return { isValid: true };
};

export const validateTaskTitle = (title: string): { isValid: boolean; message?: string } => {
  const required = validateRequired(title, 'Task title');
  if (!required.isValid) return required;
  
  if (title.length > 200) {
    return { isValid: false, message: 'Task title cannot exceed 200 characters' };
  }
  return { isValid: true };
};

export const validateTaskDescription = (description: string): { isValid: boolean; message?: string } => {
  if (description && description.length > 1000) {
    return { isValid: false, message: 'Task description cannot exceed 1000 characters' };
  }
  return { isValid: true };
};

export const validateURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

