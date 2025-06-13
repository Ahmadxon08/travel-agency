import { ID, OAuthProvider, Query } from "appwrite";
import { account, appwriteConfig, database } from "./client";
import { redirect } from "react-router";

export const loginWithGoogle = async () => {
  try {
    await account.createOAuth2Session(
      OAuthProvider.Google,
      "http://localhost:5173/dashboard", // muvaffaqiyatli login
      "http://localhost:5173/sign-in" // foydalanuvchi bekor qilsa
    );
  } catch (error) {
    console.log("LoginWithGoogle xatosi:", error);
  }
};
export const logOut = async () => {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.log(error, " log out error");
  }
};
export const getUser = async () => {
  try {
    const user = await account.get();
    if (!user) return redirect("/sign-in");

    const { documents } = await database.listDocuments(
      appwriteConfig.databasedId,
      appwriteConfig.usercollectonId,
      [
        Query.equal("accountId", user.$id),
        Query.select(["name", "email", "imageUrl", "jointedAt", "accountId"]),
      ]
    );
    if (documents.length === 0) {
      return await storeUserData();
    }
  } catch (error) {
    console.log(error);
  }
};
export const getGooglePicture = async () => {
  try {
    const session = await account.getSession("current");
    const oAuthToken = session.providerAccessToken;
    if (!oAuthToken) {
      console.log("No auth token");
      return null;
    }

    const res = await fetch(
      "https://people.googleapis.com/v1/people/me?personFields=photos",
      {
        headers: {
          Authorization: `Bearer ${oAuthToken}`,
        },
      }
    );
    if (!res.ok) {
      console.log("failed from getGooglePicture");
      return null;
    }

    const data = await res.json();
    const photoUrl =
      data.photos && data.photos.length > 0 ? data.photos[0].url : null;

    return photoUrl;
  } catch (error) {
    console.log(error);
  }
};
export const storeUserData = async () => {
  try {
    const user = await account.get();
    if (!user) return null;

    const { documents } = await database.listDocuments(
      appwriteConfig.databasedId,
      appwriteConfig.usercollectonId,
      [Query.equal("accountId", user.$id)]
    );

    if (documents.length > 0) return documents[0];

    const imageUrl = await getGooglePicture();

    const newUser = await database.createDocument(
      appwriteConfig.databasedId,
      appwriteConfig.usercollectonId,
      ID.unique(),
      {
        accountId: user.$id,
        email: user.email,
        name: user.name,
        imageUrl: imageUrl || "",
        jointedAt: new Date().toISOString(),
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const getExistingUser = async (id: string) => {
  try {
    const user = await account.get();
    if (!user) return null;

    const { documents } = await database.listDocuments(
      appwriteConfig.databasedId,
      appwriteConfig.usercollectonId,
      [Query.equal("accointId", user.$id)]
    );

    if (documents.length === 0) return null;
  } catch (error) {
    console.log(error);
  }
};
