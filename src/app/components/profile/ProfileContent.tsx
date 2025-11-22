import { ProfileHeader } from "./ProfileHeader";

interface ProfileContentProps {
  user: {
    name?: string;
    email?: string;
  };
}

export function ProfileContent({ user }: ProfileContentProps) {
  return <ProfileHeader user={user} />;
}
