# React Functional Component Syntax Guide

This guide lists a recommended structure and order for writing React functional components, using TypeScript and hooks.  
You can use this as a checklist or template when building your own components.

---

## 1. **Imports**
Import React, hooks, types, and any UI components or libraries you need.

```tsx
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
```

---

## 2. **Component Declaration**
Export your component as a function.  
If you use props, define a props type/interface first.

```tsx
interface MyComponentProps {
  title: string;
}

export default function MyComponent({ title }: MyComponentProps) {
  // Component logic goes here
}
```

---

## 3. **State Declarations**
Declare all your `useState` hooks at the top of the function.

```tsx
const [value, setValue] = useState("");
const [error, setError] = useState("");
```

---

## 4. **Derived Values / Memoization**
Use `useMemo` or `useCallback` for derived values or memoized functions.

```tsx
const computedValue = useMemo(() => value.trim(), [value]);
```

---

## 5. **Side Effects**
Place all `useEffect` hooks after state declarations.

```tsx
useEffect(() => {
  // Fetch data or perform side effects
}, []);
```

---

## 6. **Event Handlers**
Define functions for handling events (form changes, button clicks, etc).

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Validatioin logic
  submit(e);
}

const submit = async (e: React.FormEvent) => {
  e.preventDefault();
  // Submit logic
};
```

---

## 7. **Render / Return JSX**
Return the JSX for your component.  
Use semantic HTML and map over arrays for lists.

```tsx
return (
  <form onSubmit={handleSubmit}>
    <Input value={value} onChange={handleChange} />
    <Button type="submit">Submit</Button>
    {error && <p>{error}</p>}
  </form>
);
```

---

## 8. **Comments**
Add comments above each section or function to explain its purpose.

---

## Example Structure

```tsx
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

// Main component for adding a new entry
export default function AddEntry() {
  // State declarations
  const [entry, setEntry] = useState("");
  const [error, setError] = useState("");

  // Side effect: fetch initial data
  useEffect(() => {
    // Fetch logic here
  }, []);

  // Event handler: input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntry(e.target.value);
  };

  // Event handler: form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
  };

  // Render JSX
  return (
    <form onSubmit={handleSubmit}>
      <Input value={entry} onChange={handleChange} />
      <Button type="submit">Add</Button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

---

**Tip:**  
Keep your components small and focused.  
Extract logic or UI into separate components