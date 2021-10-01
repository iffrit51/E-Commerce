import React from 'react';
import {InputLabel,Select,MenuItem,Button,Grid,Typography} from '@material-ui/core';
import {useForm,FormProvider} from 'react-hook-form';

import {commerce} from '../../lib/commerce';

import FormInput from './CustomTextField';

const AddressForm = () => {
    cont [shippingCountries,setShippingCountries] = useState([]);
    cont [shippingCountrye,setShippingCountry] = useState('');
    cont [shippingSubdivisions,setShippingSubdivisions] = useState([]);
    cont [shippingSubdivision,setShippingSubdivision] = useState('');
    cont [shippingOptions,setShippingOptions] = useState([]);
    cont [shippingOption,setShippingOption] = useState('');
    const methods = useForm();
    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput required name='prenom' label='Prénom'/>
                        <FormInput required name='nom' label='Nom'/>
                        <FormInput required name='adresse' label='Adresse'/>
                        <FormInput required name='email' label='Email'/>
                        <FormInput required name='ville' label='Ville'/>
                        <FormInput required name='code_postal' label='Code Postal'/>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Pays</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivisions</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>
        </>
    );
}

export default AddressForm
