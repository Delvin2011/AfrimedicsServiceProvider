import { UserActionTypes } from "./user-types";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import selectCurrentUser from "./user-selectors";

export const emailLogInStart = (credentials) => {
  return (dispatch) => {
    auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: UserActionTypes.SIGN_IN_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: UserActionTypes.SIGN_IN_FAILURE, err });
      });
  };
};

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
export const signOut = () => {
  return (dispatch) => {
    auth()
      .signOut()
      .then(() => {
        dispatch({ type: UserActionTypes.SIGN_OUT_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: UserActionTypes.SIGN_OUT_FAILURE, err });
      });
  };
};

export const toggleAddRecord = () => ({
  type: UserActionTypes.USER_TOGGLE_ADDRECORD, //we do not need the payload in this case.
});

/*export const viewDoctorsOnMap = () => ({
  type: UserActionTypes.USER_VIEW_MAP, //we do not need the payload in this case.
});*/

export function viewDoctorsOnMap(status) {
  return (dispatch) => {
    firestore()
      .collection("serviceProviders")
      .doc(auth().currentUser.uid)
      .update({ available: !status })
      .then(() => {
        dispatch({
          type: UserActionTypes.USER_VIEW_MAP,
          payload: !status,
        });
      });
  };
}

export const searchSpecialist = (specialist) => {
  return (dispatch) => {
    dispatch({
      type: UserActionTypes.SEARCH_SPECIALIST,
      payload: { specialist },
    });
  };
};

export const appointmentConnect = (connectDetails) => {
  return (dispatch) => {
    dispatch({
      type: UserActionTypes.SET_APPOINTMENT_CONNECTION_DETAILS,
      payload: connectDetails,
    });
  };
};

export const specialistLocation = (location) => {
  return (dispatch) => {
    dispatch({
      type: UserActionTypes.SPECIALIST_LOCATION,
      payload: location,
    });
  };
};

export const dependantSelection = (dependant) => {
  return (dispatch) => {
    dispatch({
      type: UserActionTypes.DEPENDANT_SELECTION,
      payload: dependant,
    });
  };
};

export const headerTabOptionChange = (tabOption) => {
  return (dispatch) => {
    dispatch({
      type: UserActionTypes.HEADER_TAB_OPTION_CHANGE,
      payload: { tabOption },
    });
  };
};

export function fetchDigitalMedicalrecords() {
  return (dispatch) => {
    firestore()
      .collection("records")
      .doc(auth().currentUser.uid)
      .collection("userGigitalRecords")
      .orderBy("Date", "asc")
      .get()
      .then((snapshot) => {
        let records = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({
          type: UserActionTypes.USER_DIGITALRECORDS_STATE_CHANGE,
          payload: records,
        });
      });
  };
}

export function fetchDigitalMedicalrecords2() {
  return (dispatch) => {
    firestore()
      .collection("records")
      .doc(auth().currentUser.uid)
      .collection("userDigitalRecords")
      //.orderBy('Date', 'asc')
      .get()
      .then((snapshot) => {
        let records = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({
          type: UserActionTypes.USER_DIGITALRECORDS_STATE_CHANGE2,
          payload: records,
        });
      });
  };
}

export function fetchMedicalrecords(practiceNumber) {
  const code = practiceNumber.replace("-", "");
  return (dispatch) => {
    firestore()
      .collection("medicalServiceAppointments")
      .doc(code.toString())
      .collection("Prescriptions")
      .orderBy("Creation", "desc")
      .get()
      .then((snapshot) => {
        let records = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({
          type: UserActionTypes.USER_RECORDS_STATE_CHANGE,
          payload: records,
        });
      });
  };
}

export function addMedicalRecord(itemToAdd, records) {
  records.push(itemToAdd);
  const practiceCode = itemToAdd.PracticeCode.replace("-", "");
  return (dispatch) => {
    firestore()
      .collection("medicalServiceAppointments")
      .doc(practiceCode)
      .collection("Prescriptions")
      .add(itemToAdd)
      .then(() => {
        dispatch(
          { type: UserActionTypes.ADD_MEDICAL_RECORD, payload: records },
        );
      })
      .catch((err) => {
        dispatch({ type: UserActionTypes.ADD_MEDICAL_RECORD_FAILER, err });
      });
  };
}

export function addMedicalRecordToPatient(itemToAdd) {
  return (dispatch) => {
    firestore()
      .collection("records")
      .doc(itemToAdd.PatientId)
      .collection("userPrescriptions")
      .add(itemToAdd)
      .then(() => {
        dispatch(
          { type: UserActionTypes.ADD_MEDICAL_RECORD_TO_PATIENT },
        );
      })
      .catch((err) => {
        dispatch(
          { type: UserActionTypes.ADD_MEDICAL_RECORD_TO_PATIENT_FAILER, err },
        );
      });
  };
}

export function fetchMedicalAppointments(practiceNumber) {
  const code = practiceNumber.replace("-", "");
  return (dispatch) => {
    firestore()
      .collection("medicalServiceAppointments")
      .doc(code.toString())
      .collection("Appointments")
      .orderBy("DateTime", "desc")
      .get()
      .then((snapshot) => {
        let records = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({
          type: UserActionTypes.USER_APPOINTMENTS_STATE_CHANGE,
          payload: records,
        });
      })
      .catch((err) => {
        dispatch(
          { type: UserActionTypes.USER_APPOINTMENTS_STATE_CHANGE_FAILER, err },
        );
      });
  };
}

export function addQuotationRequest(itemToAdd, quotations) {
  quotations.push(itemToAdd);
  return (dispatch) => {
    firestore()
      .collection("records")
      .doc(auth().currentUser.uid)
      .collection("userQuotationsRequest")
      .add(itemToAdd)
      .then(() => {
        dispatch({
          type: UserActionTypes.ADD_QUOTATION_REQUEST,
          payload: quotations,
        });
      })
      .catch((err) => {
        dispatch({ type: UserActionTypes.ADD_QUOTATION_REQUEST_FAILER, err });
      });
  };
}

export function fetchQuotationsRequest() {
  return (dispatch) => {
    firestore()
      .collection("records")
      .doc(auth().currentUser.uid)
      .collection("userQuotationsRequest")
      //.orderBy('Date', 'asc')
      .get()
      .then((snapshot) => {
        let quotations = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({
          type: UserActionTypes.USER_QUOTATION_REQUEST_STATE_CHANGE,
          payload: quotations,
        });
      });
  };
}

export function removeMedicalRecord(itemToRemove, items) {
  const updatedItems = items.filter((item) => item.id !== itemToRemove.id);
  const practiceCode = itemToRemove.PracticeCode.replace("-", "");
  return (dispatch) => {
    firestore()
      .collection("medicalServiceAppointments")
      .doc(practiceCode)
      .collection("Prescriptions")
      .doc(itemToRemove.id)
      .delete()
      .then(() => {
        dispatch({
          type: UserActionTypes.REMOVE_MEDICAL_RECORD,
          payload: updatedItems,
        });
      })
      .catch((err) => {
        dispatch({ type: UserActionTypes.REMOVE_MEDICAL_RECORD_FAILER, err });
      });
  };
}

function update(target, src) {
  const res = {};
  Object.keys(target).forEach((k) => (res[k] = src[k] ?? target[k]));
  return res;
}
export function updateAppointmentRecord(toUpdate, record, records) {
  const newRecords = records.filter((item) => item.id !== record.id);
  var newRecord = update(record, toUpdate);
  if (newRecords) {
    newRecords.push(newRecord);
  } else newRecords = newRecord;
  return (dispatch) => {
    firestore()
      .collection("medicalServiceAppointments")
      .doc(auth().currentUser.uid)
      .collection("Appointments")
      .doc(record.id)
      .update(toUpdate)
      .then(() => {
        dispatch({
          type: UserActionTypes.USER_APPOINTMENTS_STATE_CHANGE,
          payload: newRecords,
        });
      });
  };
}

export function addAppointmentRecord(
  appointmentDetailsToAdd,
  appointmentRecords,
) {
  if (appointmentRecords) {
    appointmentRecords.push(appointmentDetailsToAdd);
  } else appointmentRecords = appointmentDetailsToAdd;

  return (dispatch) => {
    firestore()
      .collection("appointments")
      .doc(auth().currentUser.uid)
      .collection("userAppointments")
      .add(appointmentDetailsToAdd)
      .then(() => {
        dispatch({
          type: UserActionTypes.ADD_APPOINTMENT_RECORD,
          payload: appointmentRecords,
        });
      })
      .catch((err) => {
        dispatch({ type: UserActionTypes.ADD_APPOINTMENT_RECORD_FAILER, err });
      });
  };
}

export function fetchUserDependants() {
  return (dispatch) => {
    firestore()
      .collection("dependants")
      .doc(auth().currentUser.uid)
      .collection("userDependants")
      .get()
      .then((snapshot) => {
        let dependants = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({
          type: UserActionTypes.USER_DEPENDANTS_STATE_CHANGE,
          payload: dependants,
        });
      })
      .catch((err) => {
        dispatch({
          type: UserActionTypes.USER_DEPENDANTS_STATE_CHANGE_FAILER,
          err,
        });
      });
  };
}

export function addUserDependant(dependantDetailsToAdd, dependantsRecords) {
  if (dependantsRecords) {
    dependantsRecords.push(dependantDetailsToAdd);
  } else dependantsRecords = dependantDetailsToAdd;

  return (dispatch) => {
    firestore()
      .collection("dependants")
      .doc(auth().currentUser.uid)
      .collection("userDependants")
      .add(dependantDetailsToAdd)
      .then(() => {
        dispatch({
          type: UserActionTypes.ADD_DEPENDANT_RECORD,
          payload: dependantsRecords,
        });
      })
      .catch((err) => {
        dispatch({ type: UserActionTypes.ADD_DEPENDANT_RECORD_FAILER, err });
      });
  };
}

export function removeUserDependant(itemToRemove, items) {
  const updatedItems = items.filter((item) => item.id !== itemToRemove.id);
  return (dispatch) => {
    firestore()
      .collection("dependants")
      .doc(auth().currentUser.uid)
      .collection("userDependants")
      .doc(itemToRemove.id)
      .delete()
      .then(() => {
        dispatch({
          type: UserActionTypes.REMOVE_DEPENDANT,
          payload: updatedItems,
        });
      })
      .catch((err) => {
        dispatch({ type: UserActionTypes.REMOVE_DEPENDANT_FAILER, err });
      });
  };
}

export function addAppointmentRecords(items, appointmentRecords) {
  return (dispatch) => {
    firestore()
      .collection("medicalServiceAppointments")
      .doc(auth().currentUser.uid)
      .collection("Appointments")
      .add(items[0])
      .then(() => {
        dispatch({
          type: UserActionTypes.USER_APPOINTMENTS_STATE_CHANGE,
          payload: appointmentRecords,
        });
      });
  };
}
