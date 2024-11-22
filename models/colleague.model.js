import mongoose from 'mongoose';

const colleagueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }]
}, { timestamps: true });

const Colleague = mongoose.model('Colleague', colleagueSchema);
export default Colleague