import { useState } from "react";
import { useNavigate } from "react-router";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface RegisterProps {
  onSuccess?: () => void;
}

export default function Register({ onSuccess }: RegisterProps) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordRepeat: "",
    fullName: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const register = async () => {
    await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (data) => {
      const response = await data.json();

      if (response.success) {
        setSuccess(response.success);
        navigate("/");
      } else if (response.error) {
        setError(response.error);
      } else {
        setError("Something went wrong");
      }
    });
  };

  const handleFormChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    //Frontend validation
    if (!formData.email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.passwordRepeat) {
      setError("The passwords doesn't match!");
      return;
    }

    if (formData.fullName.length < 2) {
      setError("Name must be at least 2 characters.")
    }
    register();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col text-left w-full max-w-sm gap-5"
    >
      <p>Register a new account</p>
      <div>
        <Label className="pb-2" htmlFor="email">
          Email
        </Label>
        <Input
          value={formData.email}
          onChange={handleFormChange}
          id="email"
          name="email"
          type="email"
          placeholder="Your email"
        />
      </div>
      <div>
        <Label className="pb-2" htmlFor="password">
          Password
        </Label>
        <Input
          value={formData.password}
          onChange={handleFormChange}
          id="password"
          name="password"
          type="password"
          placeholder="A clever password"
        />
      </div>
      <div>
        <Label className="pb-2" htmlFor="password">
          Repeat Password
        </Label>
        <Input
          value={formData.passwordRepeat }
          onChange={handleFormChange}
          id="passwordRepeat"
          name="passwordRepeat"
          type="password"
          placeholder="Your very cunningly created password once more"
        />
      </div>
      <div>
        <Label className="pb-2" htmlFor="name">
          Name
        </Label>
        <Input
          value={formData.fullName}
          onChange={handleFormChange}
          id="name"
          name="fullName"
          type="name"
          placeholder="Your full name"
        />
      </div>
      <Button type="submit">Submit</Button>
      {error && <p className="bg-red-500 text-white p-4 rounded-xl">{error}</p>}
      {success && (
        <p className="bg-green-500 text-white p-4 rounded-xl">{success}</p>
      )}
    </form>
  );
}
