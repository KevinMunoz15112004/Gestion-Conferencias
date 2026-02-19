import mongoose from 'mongoose';

const reservaSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: [true, 'El código es obligatorio'],
    unique: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true
  },
  auditorio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auditorio',
    required: [true, 'El auditorio es obligatorio']
  },
  conferencista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conferencista',
    required: [true, 'El conferencista es obligatorio']
  }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model('Reserva', reservaSchema);
