import { Metadata } from "next";

type ProfilePageProps = {
params: Promise<{profileId: string}>
}

export const metadata: Metadata = {
  title: "Профиль: ...",
};

export default async function ProfilePage({params}: ProfilePageProps){
const data = await params
const profileId = data.profileId

console.log('profileId', profileId)
    return(
        <section>
            <div className="container">
                <h1 className="profile_text">
                    ProfilePage: {profileId} <br />
                    beta
                </h1>
            </div>
        </section>
    )
}