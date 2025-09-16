import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

interface Profile {
	id: string; // uuid (matches auth.users.id)
	first_name: string;
	last_name: string;
	username: string;
	dob: string; // or Date if you parse it
	interests: string[] | null;
	onboarding_step: number;
	onboarding_complete: boolean;
}

interface SupabaseContextType {
	user: User | null;
	session: Session | null;
	loading: boolean;
	signUp: (email: string, password: string) => Promise<any>;
	signIn: (email: string, password: string) => Promise<any>;
	signOut: () => Promise<void>;
	profile: Profile | null; // create a type or infer it
	refreshProfile: () => Promise<void>;
	insertUserProfile: (
		firstName: string,
		lastName: string,
		username: string,
		dob: string,
		interests?: string[],
		onboarding_step?: number
	) => Promise<any>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(
	undefined
);

export const SupabaseProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState<Profile | null>(null);

	useEffect(() => {
		const initSession = async () => {
			const { data } = await supabase.auth.getSession();
			setSession(data.session);
			setUser(data.session?.user ?? null);
			setLoading(false);
		};

		initSession();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setUser(session?.user ?? null);
		});

		return () => subscription.unsubscribe();
	}, []);

	const signUp = async (email: string, password: string) => {
		return await supabase.auth.signUp({ email, password });
	};

	const signIn = async (email: string, password: string) => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			throw new Error(error.message);
		}
	};

	const signOut = async () => {
		await supabase.auth.signOut();
		setUser(null);
		setSession(null);
	};

	const refreshProfile = async () => {
		if (!user) {
			setProfile(null);
			return;
		}

		const { data, error } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", user.id)
			.single();

		if (error) {
			console.error("Error fetching profile:", error);
			setProfile(null);
		} else {
			setProfile(data);
		}
	};

	const insertUserProfile = async (
		firstName: string,
		lastName: string,
		username: string,
		dob: string
	) => {
		if (!user) {
			throw new Error("User not authenticated");
		}

		try {
			// Corrected upsert call
			const { data, error } = await supabase.from("profiles").upsert(
				[
					{
						id: user.id, // Use user id as the UUID
						first_name: firstName,
						last_name: lastName,
						username,
						dob,
						created_at: new Date(),
					},
				],
				{ onConflict: "id" } // Use a single string (the column name)
			);

			if (error) {
				throw new Error(error.message);
			}

			return data;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	return (
		<SupabaseContext.Provider
			value={{
				user,
				session,
				loading,
				signUp,
				signIn,
				signOut,
				profile,
				refreshProfile,
				insertUserProfile,
			}}
		>
			{children}
		</SupabaseContext.Provider>
	);
};

export const useSupabase = () => {
	const context = useContext(SupabaseContext);
	if (!context)
		throw new Error("useSupabase must be used within SupabaseProvider");
	return context;
};
