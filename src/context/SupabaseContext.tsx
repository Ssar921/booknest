import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

interface SupabaseContextType {
	user: User | null;
	session: Session | null;
	loading: boolean;
	signUp: (email: string, password: string) => Promise<any>;
	signIn: (email: string, password: string) => Promise<any>;
	signOut: () => Promise<void>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(
	undefined
);

export const SupabaseProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);

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
		return await supabase.auth.signInWithPassword({ email, password });
	};

	const signOut = async () => {
		await supabase.auth.signOut();
		setUser(null);
		setSession(null);
	};

	return (
		<SupabaseContext.Provider
			value={{ user, session, loading, signUp, signIn, signOut }}
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
