import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast, Slide } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const safeToast = (callback) => {
        setTimeout(callback, 0);
    };

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existing = prevItems.find(i => i.id === product.id);
            if (existing) {
                if (existing.quantity >= 10) {
                    safeToast(() =>
                        toast.info("Maximum quantity is 10", {
                            position: "bottom-center",
                            autoClose: 3000,
                            transition: Slide
                        })
                    );
                    return prevItems;
                }
                return prevItems.map(i =>
                    i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                safeToast(() =>
                    toast.success("Product added successfully", {
                        position: "bottom-center",
                        autoClose: 5000,
                        transition: Slide
                    })
                );
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const handleIncrease = (id, productToAdd) => {
        setCartItems(prevItems => {
            const existing = prevItems.find(i => i.id === id);
            if (existing) {
                if (existing.quantity >= 10) {
                    safeToast(() =>
                        toast.info("Maximum quantity is 10", {
                            position: "bottom-center",
                            autoClose: 3000,
                            transition: Slide
                        })
                    );
                    return prevItems;
                }
                return prevItems.map(i =>
                    i.id === id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                safeToast(() =>
                    toast.success("Product added successfully", {
                        position: "bottom-center",
                        autoClose: 5000,
                        transition: Slide
                    })
                );
                return [...prevItems, { ...productToAdd, quantity: 1 }];
            }
        });
    };

    const handleDecrease = (id) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === id);

            if (existingItem && existingItem.quantity === 1) {
                safeToast(() =>
                    toast.info("Product removed from cart", {
                        position: "bottom-center",
                        autoClose: 3000,
                        transition: Slide
                    })
                );
            }

            return prevItems
                .map(i =>
                    i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                )
                .filter(i => i.quantity > 0);
        });
    };

    const handleDelete = (id) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.filter(i => i.id !== id);
            if (prevItems.length !== updatedItems.length) {
                safeToast(() =>
                    toast.info("Product removed from cart", {
                        position: "bottom-center",
                        autoClose: 3000,
                        transition: Slide
                    })
                );
            }
            return updatedItems;
        });
    };

    useEffect(() => {
        const stored = localStorage.getItem('cart');
        if (stored) {
            try {
                setCartItems(JSON.parse(stored));
            } catch {
                localStorage.removeItem('cart');
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const [selectedAddressId, setSelectedAddressId] = useState('');
    const [savedAddresses, setSavedAddresses] = useState(() => {
        const stored = localStorage.getItem('savedAddresses');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem('savedAddresses', JSON.stringify(savedAddresses));
    }, [savedAddresses]);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: ''
    });

    useEffect(() => {
        const selected = savedAddresses.find(addr => addr.id === selectedAddressId);
        if (selected) {
            setFormData({
                fullName: selected.fullName,
                email: selected.email,
                address: selected.address,
                city: selected.city,
                state: selected.state,
                zip: selected.zip
            });
        }
    }, [selectedAddressId, savedAddresses]);

    const handleSaveAddress = () => {
        if (!formData.fullName || !formData.email || !formData.address) {
            toast.error('Please fill form', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide
            });
            return;
        }

        const isUpdating = savedAddresses.some(addr => addr.id === selectedAddressId);

        if (isUpdating) {
            const updated = savedAddresses.map(addr =>
                addr.id === selectedAddressId ? { ...formData, id: selectedAddressId } : addr
            );
            setSavedAddresses(updated);
            toast.success("Address updated!", {
                position: "bottom-center",
                autoClose: 3000,
                transition: Slide
            });
        } else {
            const newAddress = {
                ...formData,
                id: 'address' + Date.now()
            };
            setSavedAddresses(prev => [...prev, newAddress]);
            setSelectedAddressId(newAddress.id);
            toast.success("New address saved!", {
                position: "bottom-center",
                autoClose: 3000,
                transition: Slide
            });
        }

        setFormData({
            fullName: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zip: ''
        });

        setSelectedAddressId('');
    };


    const handleEditAddress = (id) => {
        const addrToEdit = savedAddresses.find(addr => addr.id === id);
        if (addrToEdit) {
            setFormData({ ...addrToEdit });
            setSelectedAddressId(id);
        }
    };
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    const handleDeleteAddress = (id) => {
        const updated = savedAddresses.filter(addr => addr.id !== id);
        setSavedAddresses(updated);
        if (selectedAddressId === id) {
            setSelectedAddressId('');
            setFormData({
                fullName: '',
                email: '',
                address: '',
                city: '',
                state: '',
                zip: ''
            });
        }
    };
    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                handleIncrease,
                handleDecrease,
                handleDelete,
                formData,
                setFormData,
                selectedAddressId,
                setSelectedAddressId,
                savedAddresses,
                handleSaveAddress,
                handleEditAddress,
                handleDeleteAddress,
                clearCart,
            }}
        >

            {children}
        </CartContext.Provider>
    );

};

export const useCart = () => useContext(CartContext);
