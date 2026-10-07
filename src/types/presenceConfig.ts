export interface PresenceConfig {
	enable: boolean;
	endpoint: string;
	pollInterval: number;
}

export interface PresenceStatus {
	state: "online" | "away" | "offline";
	activity: string | null;
	music: { title: string; artist: string; playing: boolean } | null;
	updatedAt: number | null;
	expiresAt: number | null;
}
