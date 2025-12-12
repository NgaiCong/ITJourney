'use client';

// Types
export interface UserProfile {
    id: string; // username
    name: string;
    email: string;
    avatar?: string;
    level: string;
    joinDate: string;
    streak: number;
    lastLogin: string;
}

export interface QuizResult {
    score: number;
    level: string;
    date: string;
    details: Record<string, number>;
}

export interface FlashcardProgress {
    term: string;
    status: 'new' | 'learning' | 'review' | 'mastered';
    nextReview: number;
    interval: number;
}

export interface TaskProgress {
    id: number;
    completed: boolean;
    completedAt?: string;
}

interface StoredUserData {
    profile: UserProfile;
    password?: string;
    quiz?: QuizResult;
    flashcards?: Record<string, FlashcardProgress>;
    tasks?: TaskProgress[];
}

const STORAGE_KEYS = {
    USERS_DB: 'devjourney_users_db',
    CURRENT_USER: 'devjourney_current_user',
};

const GUEST_ID = 'public_guest';

const createDefaultUser = (id: string): StoredUserData => ({
    profile: {
        id,
        name: 'Guest',
        email: 'guest@local',
        level: 'Newbie',
        joinDate: new Date().toISOString(),
        streak: 1,
        lastLogin: new Date().toISOString(),
        avatar: 'bg-indigo-500' // Default color
    },
    password: '',
    flashcards: {},
    tasks: [],
    quiz: undefined
});

export const StorageService = {
    getUsersDB: (): Record<string, StoredUserData> => {
        if (typeof window === 'undefined') return {};
        const data = localStorage.getItem(STORAGE_KEYS.USERS_DB);
        return data ? JSON.parse(data) : {};
    },

    saveUsersDB: (db: Record<string, StoredUserData>) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(db));
    },

    getCurrentUsername: (): string => {
        if (typeof window === 'undefined') return GUEST_ID;
        return localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || GUEST_ID;
    },

    // Ensure user exists before performing actions
    ensureUserExists: (db: Record<string, StoredUserData>, username: string) => {
        if (!db[username]) {
            db[username] = createDefaultUser(username);
            return true; // Modified
        }
        return false;
    },

    // --- Data Access (Auto-handles Guest) ---

    saveQuizResult: (result: QuizResult) => {
        const username = StorageService.getCurrentUsername();
        const db = StorageService.getUsersDB();
        StorageService.ensureUserExists(db, username);

        db[username].quiz = result;
        db[username].profile.level = result.level;
        StorageService.saveUsersDB(db);
    },

    getQuizResult: (): QuizResult | null => {
        const username = StorageService.getCurrentUsername();
        const db = StorageService.getUsersDB();
        return db[username]?.quiz || null;
    },

    getFlashcardProgress: (): Record<string, FlashcardProgress> => {
        const username = StorageService.getCurrentUsername();
        const db = StorageService.getUsersDB();
        return db[username]?.flashcards || {};
    },

    updateFlashcard: (term: string, quality: number) => {
        const username = StorageService.getCurrentUsername();
        const db = StorageService.getUsersDB();
        StorageService.ensureUserExists(db, username);

        const progress = db[username].flashcards || {};
        const card = progress[term] || { term, status: 'new', nextReview: Date.now(), interval: 0 };

        if (quality >= 3) {
            if (card.interval === 0) card.interval = 1;
            else if (card.interval === 1) card.interval = 3;
            else card.interval = Math.round(card.interval * 1.5);
            card.status = card.interval > 20 ? 'mastered' : 'review';
        } else {
            card.interval = 1;
            card.status = 'learning';
        }

        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + card.interval);
        card.nextReview = nextDate.getTime();

        progress[term] = card;
        db[username].flashcards = progress;
        StorageService.saveUsersDB(db);
    },

    getTasks: (): TaskProgress[] => {
        const username = StorageService.getCurrentUsername();
        const db = StorageService.getUsersDB();
        return db[username]?.tasks || [];
    },

    toggleTask: (taskId: number) => {
        const username = StorageService.getCurrentUsername();
        const db = StorageService.getUsersDB();
        StorageService.ensureUserExists(db, username);

        const tasks = db[username].tasks || [];
        const existing = tasks.find(t => t.id === taskId);

        if (existing) {
            existing.completed = !existing.completed;
            existing.completedAt = existing.completed ? new Date().toISOString() : undefined;
        } else {
            tasks.push({ id: taskId, completed: true, completedAt: new Date().toISOString() });
        }

        db[username].tasks = tasks;
        StorageService.saveUsersDB(db);
    },

    // Keeping logout/export just in case, but they are hidden from UI
    logout: () => {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        window.location.reload();
    },

    exportUserData: (): string | null => {
        const username = StorageService.getCurrentUsername();
        const db = StorageService.getUsersDB();
        const userData = db[username];
        if (!userData) return null;

        return JSON.stringify({
            version: 1,
            timestamp: new Date().toISOString(),
            data: userData
        }, null, 2);
    },

    // ... imports ...
};
