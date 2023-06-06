import { Button, Form, Spinner } from "react-bootstrap"
import { toast } from "react-toastify"
import { userSignUp } from "../../Context/apis"
import { useRef, useState } from "react"

const Signup = ({ active, setActive }) => {
    const [fields, setFields] = useState({ fullName: '', email: '', mobile: '', gender: '', password: '' })
    const [isLoad, setIsLoad] = useState(false)

    // useRef
    const genderRef = useRef(null)

    const signUp = async (e) => {
        e.preventDefault()
        
        if (fields.gender === 'Gender' || fields.gender === '') {

            genderRef.current.focus()
            toast('Gender field required.')

        } else {

            setIsLoad(true)
            
            //login user by api
            const res = await userSignUp(fields)
    
            if (!res.status) {
                toast(res.message)
                setIsLoad(false)
            } else {
                setTimeout(() => {
                    toast(res.message)
                    setFields({ fullName: '', email: '', mobile: '', gender: '', password: '' })
                    setIsLoad(false)
                    setActive(false)
                }, 1000)
            }

        }
    }

    return (
        <Form onSubmit={signUp} className={active ? 'active' : ''}>
            <h1>Sign Up</h1>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Full Name"
                    value={fields.fullName}
                    onChange={(e) => setFields({ ...fields, fullName: e.target.value })}
                    required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="email"
                    placeholder="Email"
                    value={fields.email}
                    onChange={(e) => setFields({ ...fields, email: e.target.value })}
                    required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Mobile Number"
                    value={fields.mobile}
                    onChange={(e) => setFields({ ...fields, mobile: e.target.value })}
                    required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={fields.password}
                    onChange={(e) => setFields({ ...fields, password: e.target.value })}
                    required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Select
                    aria-label="Gender"
                    value={fields.gender}
                    onChange={(e) => setFields({ ...fields, gender: e.target.value })}
                    ref={genderRef}
                    required>
                    <option>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Form.Select>
            </Form.Group>
            <Button type="submit" className="w-100">
                {isLoad && <Spinner animation="border" size="sm" variant="light" className="mx-2" />}
                Sign Up
            </Button>
        </Form>
    )
}

export default Signup