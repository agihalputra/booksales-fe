import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/public"
import PublicLayout from "./layouts/public"
import Books from "./pages/public/books"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import AdminLayout from "./layouts/admin"
import AdminBooks from "./pages/admin/books"
import BookCreate from "./pages/admin/books/create"
import Dashboard from "./pages/admin"
import BookEdit from "./pages/admin/books/edit"
import ShowBook from "./pages/public/books/show"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            
            <Route path="books">
              <Route index element={<Books />} />
              <Route path="show/:id" element={<ShowBook />} />
            </Route>
          </Route>

          {/* Auth */}
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}/>

          {/* Admin: DIBUKA DAN DITUTUP */}
          <Route path="admin" element={<AdminLayout />}> 
            <Route index element={<Dashboard />} />

            <Route path="books"> {/* Rute Books DIBUKA */}
              <Route index element={<AdminBooks/>}/>
              <Route path="create" element={<BookCreate />}/>
              <Route path="edit/:id" element={<BookEdit />}/>
            </Route> {/* Rute Books DITUTUP */}

          </Route> {/* Rute Admin DITUTUP */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
