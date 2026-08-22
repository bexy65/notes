import { useState } from "react";
import { useApi } from "../hooks/apiHook";


function AccountSettings() {
  const [openChangePasswordFields, setOpenChangePasswordFields] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const { authenticatedFetch } = useApi();


  const userRaw = localStorage.getItem('user');
  const user = userRaw ? JSON.parse(userRaw) : null;

  const [formData, setFormData] = useState({
    user_id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.phone,
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handlePasswordChange(e) {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  }

  function toggleChangePasswordFields(e) {
    e.preventDefault();
    setOpenChangePasswordFields((prev) => !prev);
    setPasswordError("");
    setPasswordSuccess("");
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setPasswordSuccess("");

    const { oldPassword, newPassword, confirmPassword } = passwordData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError("All password fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }

    setPasswordError("");

    try {
      // TODO: replace with your actual API call
      // await api.post('/account/change-password', { oldPassword, newPassword });

      console.log("changing password", { oldPassword, newPassword });

      setPasswordSuccess("Password updated successfully.");
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setOpenChangePasswordFields(false);
    } catch (err) {
      setPasswordError("Failed to update password. Please try again.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await authenticatedFetch(
      `http://localhost:3000/account-settings`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if(!response.ok) {
      console.log(response.error);
    } else {
      const data = await response.json();
      localStorage.setItem('user', data);
      user = localStorage.getItem('user');
    }
    
      // setFormData({
      //   user_id: user.id,
      //   firstName: user.first_name,
      //   lastName: user.last_name,
      //   email: user.email,
      //   phone: user.phone,
      // })
    // TODO: send formData (firstName, lastName, email, phone) to your API
  }

  return (
    <div>
      <div className="row">
        <h2 className="text-center my-2">Account settings</h2>
        <form
          className="form border col-12 col-md-8 col-lg-6 mx-md-auto my-4"
          onSubmit={handleSubmit}
        >
          <div className="row">
            <div className="mb-3 col-12 col-lg-6">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                id="firstName"
                name="firstName"
                className="form-control"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-12 col-lg-6">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                className="form-control"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-3 col-12">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                name="email"
                className="form-control"
                type="email"
                readOnly
                disabled
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row my-2">
            <div className="mb-3 col-12 col-lg-6">
              <button
                type="button"
                onClick={toggleChangePasswordFields}
                className="btn btn-success w-100"
              >
                {openChangePasswordFields ? "Cancel password change" : "Change password"}
              </button>
            </div>
          </div>

          {openChangePasswordFields && (
            <div className="row p-2 m-0 change-password-background">
              <div className="row mt-2 m-0">
                <label className="form-label my-2 h4">Change password</label>
                <div className="mb-3 col-12">
                  <label htmlFor="oldPassword" className="form-label">Old Password</label>
                  <input
                    id="oldPassword"
                    name="oldPassword"
                    className="form-control"
                    type="password"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
              <div className="row mb-2 m-0">
                <div className="mb-3 col-12 col-lg-6">
                  <label htmlFor="newPassword" className="form-label">Password</label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    className="form-control"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    minLength={8}
                  />
                </div>
                <div className="mb-3 col-12 col-lg-6">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
              <div className="row col-12 col-lg-6 m-0 mb-3">
                <button
                  onClick={handleChangePassword}
                  type="button"
                  className="btn btn-secondary w-100"
                >
                  Change Password
                </button>
              </div>
              {passwordError && (
                <div className="col-12 mb-2 text-danger">{passwordError}</div>
              )}
              {passwordSuccess && (
                <div className="col-12 mb-2 text-success">{passwordSuccess}</div>
              )}
            </div>
          )}

          <div className="row my-2">
            <div className="mb-3 col-12">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                id="phone"
                name="phone"
                className="form-control"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Save changes</button>
        </form>
      </div>
    </div>
  );
}

export default AccountSettings;