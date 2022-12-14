import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export const createUserProfileDocument = async (userAuth, displayName) => {
  if (!userAuth) return;

  const userRef = firestore()
    //.collection(`serviceProviders`)
    .doc(`serviceProviders/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (snapShot.exists === false) {
    const { email, displayName } = userAuth;
    const createdAt = new Date();
    //const available = false;
    //const profileURL = photoURL;
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        //available,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items, imageUrl, cartItems } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
      imageUrl,
      cartItems,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const convertCartSnapshotToMap = (carts, uid) => {
  const transformedCart = carts.docs.map((doc) => {
    const { cartItems } = doc.data();
    return {
      cartItems,
    };
  });
  return transformedCart; /*.reduce((accumulator, cart) => {
    accumulator[cart.cartItems] = cart;
    return accumulator;
  }, {})*/
};

export const getUserCartRef = async (userId) => {
  const cartsRef = firestore
    .collection("pharmacy-carts")
    .where("userId", "==", userId);
  const snapShot = await cartsRef.get();

  if (snapShot.empty) {
    const cartDocRef = firestore.collection("pharmacy-carts").doc();
    await cartDocRef.set({ userId, cartItems: [] });
    return cartDocRef;
  } else {
    return snapShot.docs[0].ref;
  }
};
