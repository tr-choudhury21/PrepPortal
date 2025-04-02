import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { Context } from '@/main';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Profile = () => {
    const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(Context);
    const [documents, setDocuments] = useState([]);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        bio: '',
        avatar: '',
        social: { facebook: '', twitter: '', linkedin: '', github: '' },
    });

    const navigate = useNavigate();

    // Sync formData with user details when user changes
    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                bio: user.bio || '',
                avatar: user.avatar || '',
                social: user.social || { facebook: '', twitter: '', linkedin: '', github: '' },
            });
        }
    }, [user]);

    // Fetch user's uploaded documents
    useEffect(() => {
        const fetchUserDocuments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/docs/userdocuments', { withCredentials: true });
                setDocuments(response.data);
            } catch (error) {
                console.error("Error fetching user documents:", error);
            }
        };
        fetchUserDocuments();
    }, []);

    // Logout handler
    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:5000/api/v1/auth/logout', { withCredentials: true });
            setIsAuthenticated(false);
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    // Handle input change for profile details
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle input change for social links
    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            social: { ...formData.social, [name]: value },
        });
    };

    // Save profile updates
    const handleSave = async () => {
        try {
            const response = await axios.put('http://localhost:5000/api/v1/auth/profile', formData, { withCredentials: true });
            
            // Ensure the response contains updated user data
            if (response.data.user) {
                setUser(response.data.user); // Update user context
                setEditing(false);
            } else {
                console.error('No updated user data received');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="container mx-auto py-16 px-4">
            <Card className="max-w-xl mx-auto shadow-lg rounded-xl overflow-hidden">
                <CardHeader className="flex flex-col items-center gap-4">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={formData.avatar} alt={user?.fullName} />
                        <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {!editing ? (
                        <>
                            <h2 className="text-2xl font-semibold">{user?.fullName}</h2>
                            <p className="text-gray-600">{user?.bio || 'No bio available'}</p>
                        </>
                    ) : (
                        <>
                            <Input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
                            <Textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Enter a short bio..." />
                            <Input type="text" name="avatar" value={formData.avatar} onChange={handleChange} placeholder="Avatar URL" />
                        </>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center gap-4">
                        <a href={formData.social.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook size={24} /></a>
                        <a href={formData.social.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter size={24} /></a>
                        <a href={formData.social.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>
                        <a href={formData.social.github} target="_blank" rel="noopener noreferrer"><FaGithub size={24} /></a>
                    </div>
                    {editing && (
                        <div className="mt-4 space-y-2">
                            <Input type="text" name="facebook" value={formData.social.facebook} onChange={handleSocialChange} placeholder="Facebook URL" />
                            <Input type="text" name="twitter" value={formData.social.twitter} onChange={handleSocialChange} placeholder="Twitter URL" />
                            <Input type="text" name="linkedin" value={formData.social.linkedin} onChange={handleSocialChange} placeholder="LinkedIn URL" />
                            <Input type="text" name="github" value={formData.social.github} onChange={handleSocialChange} placeholder="GitHub URL" />
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    {editing ? (
                        <>
                            <Button onClick={handleSave}>Save</Button>
                            <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
                        </>
                    ) : (
                        <Button onClick={() => setEditing(true)}>Edit Profile</Button>
                    )}
                    <Button variant="destructive" onClick={handleLogout}>Logout</Button>
                </CardFooter>
            </Card>

            <div className="mt-10">
                <h2 className="text-2xl text-center pb-6 font-semibold">Uploaded Documents</h2>
                {documents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {documents.map((doc) => (
                            <Card key={doc._id} className="p-4 border rounded-lg shadow hover:shadow-lg transition">
                                <h3 className="font-bold">{doc.subject}</h3>
                                <p>Semester: {doc.semester}</p>
                                <p>Year: {doc.year}</p>
                                <p>Uploaded by: {doc.uploadedBy}</p>
                                <Button as="a" href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="mt-2">
                                    View Document
                                </Button>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No documents uploaded yet.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
