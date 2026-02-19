import mongoose from 'mongoose';

const auditorioSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: [true, 'El código es obligatorio'],
    unique: true,
    trim: true
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  ubicacion: {
    type: String,
    required: [true, 'La ubicación es obligatoria'],
    trim: true
  },
  capacidad: {
    type: Number,
    required: [true, 'La capacidad es obligatoria'],
    min: [1, 'La capacidad debe ser al menos 1']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true
  }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model('Auditorio', auditorioSchema);
