import React from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useParams} from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import {addNewProjectApi} from "./api/ProjectApiService";

export default function ProjectCreator() {
    const {username} = useParams()
    const initialValue = {
        systemName: '',
        longitude: '',
        latitude: '',
        manufacturer: '',
        orientation: '',
        area: '',
        tilt: '',
        username: username
    }

    const handleSubmit = (values) => {
        const powerplan = {
            systemName: values.systemName,
            longitude: values.longitude,
            latitude: values.latitude,
            manufacturer: values.manufacturer,
            orientation: values.orientation,
            area: values.area,
            tilt: values.tilt,
            username: username
        }
        addNewProjectApi(powerplan)
            .then(response => {
                navigator(`/welcome/${username}`)
            })
            .catch(error => console.log(error))
    }

    const validateForm = (values) => {
        const errors = {}

        return errors
    }

    return(
        <div className="ProjectCreator container">
        <HeaderComponent data={username} />
            <h4>Enter Project Details</h4>
            <div>
                <Formik initialValues={initialValue} onSubmit={ handleSubmit } validate={validateForm} validateOnChange={false} validateOnBlur={false}
                        enableReinitialize={true}>
                    <Form>
                        <table className="table border-0">
                            <tbody>
                            <tr>
                                <td style={{ borderBottom: 'none' }}>
                                    <label htmlFor="systemName">System Name</label>
                                </td>
                                <td style={{ borderBottom: 'none' }}>
                                    <Field type="text" id="systemName" name="systemName" />
                                    <ErrorMessage name="systemName" component="div" />
                                </td>
                            </tr>
                            <tr>
                                <td style={{ borderBottom: 'none' }}>
                                    <label htmlFor="longitude">Longitude</label>
                                </td>
                                <td style={{ borderBottom: 'none' }}>
                                    <Field type="text" id="longitude" name="longitude" />
                                    <ErrorMessage name="longitude" component="div" />
                                </td>
                            </tr>
                            <tr>
                                <td style={{ borderBottom: 'none' }}>
                                    <label htmlFor="latitude">Latitude</label>
                                </td>
                                <td style={{ borderBottom: 'none' }}>
                                    <Field type="text" id="latitude" name="latitude" />
                                    <ErrorMessage name="latitude" component="div" />
                                </td>
                            </tr>
                            <tr>
                                <td style={{ borderBottom: 'none' }}>
                                    <label htmlFor="manufacturer">Manufacturer</label>
                                </td>
                                <td style={{ borderBottom: 'none' }}>
                                    <Field as="select" id="manufacturer" name="manufacturer">
                                        <option value="">Select Manufacturer</option>
                                        <option value="Hanwha Q-Cells">Hanwha Q-Cells</option>
                                        <option value="First Solar">First Solar</option>
                                        <option value="JinkoSolar">JinkoSolar</option>
                                    </Field>
                                    <ErrorMessage name="manufacturer" component="div" />
                                </td>
                            </tr>
                            <tr>
                                <td style={{ borderBottom: 'none' }}>
                                    <label htmlFor="orientation">Orientation</label>
                                </td>
                                <td style={{ borderBottom: 'none' }}>
                                    <Field as="select" id="orientation" name="orientation">
                                        <option value="">Select Orientation</option>
                                        <option value="North">North</option>
                                        <option value="South">South</option>
                                        <option value="East">East</option>
                                        <option value="West">West</option>
                                    </Field>
                                    <ErrorMessage name="orientation" component="div" />
                                </td>
                            </tr>
                            <tr>
                                <td style={{ borderBottom: 'none' }}>
                                    <label htmlFor="area">Area</label>
                                </td>
                                <td style={{ borderBottom: 'none' }}>
                                    <Field type="text" id="area" name="area" />
                                    <ErrorMessage name="area" component="div" />
                                </td>
                            </tr>
                            <tr>
                                <td style={{ borderBottom: 'none' }}>
                                    <label htmlFor="tilt">Tilt</label>
                                </td>
                                <td style={{ borderBottom: 'none' }}>
                                    <Field type="text" id="tilt" name="tilt" />
                                    <ErrorMessage name="tilt" component="div" />
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <button type="submit" className="btn btn-dark">Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}