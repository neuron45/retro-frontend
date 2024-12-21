import React, {useState} from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });

    const clearForm = () => {
        console.log("ABOUT TO CLEAR")
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        
        try {
          window.location.href = `mailto:info@prodiner.net?subject=Contact from ${formData.name}&body=${formData.message}`;
          
          // Show success toast
          toast.success('Message sent successfully!', {
            duration: 3000,
            position: 'top-right',
            style: {
              background: '#34D399',
              color: '#fff',
            },
          });
    
          // Clear the form
          clearForm();
          
        } catch (error) {
          // Show error toast if something goes wrong
          toast.error('Failed to send message. Please try again.', {
            duration: 3000,
            position: 'top-right',
          });
        }
      };
  
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-restro-green focus:border-restro-green transition duration-200 outline-none"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
  
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-restro-green focus:border-restro-green transition duration-200 outline-none"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
  
            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                rows={4}
                placeholder="Your message here..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-restro-green focus:border-restro-green transition duration-200 outline-none resize-none"
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              />
            </div>
  
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-restro-green text-white font-medium rounded-lg 
                       hover:bg-restro-green-dark transition duration-200 transform hover:scale-[1.02] 
                       active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-restro-green shadow-lg"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    );
}
  