import React, { useState, useEffect } from 'react';
import { 
  X, 
  HardDrive, 
  Upload, 
  Trash2, 
  ExternalLink, 
  RefreshCw, 
  FileText, 
  Search, 
  AlertTriangle, 
  Check, 
  LogOut,
  FolderPlus,
  ShieldCheck
} from 'lucide-react';
import { User } from 'firebase/auth';
import { 
  googleSignIn, 
  logoutGoogle, 
  getAccessToken 
} from '../services/firebaseAuth.ts';
import { 
  listDriveFiles, 
  uploadFileToDrive, 
  deleteDriveFile, 
  DriveFile 
} from '../services/googleDriveService.ts';

interface GoogleDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onAuthChange: (user: User | null, token: string | null) => void;
}

export const GoogleDriveModal: React.FC<GoogleDriveModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAuthChange
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  
  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [customTextTitle, setCustomTextTitle] = useState('');
  const [customTextContent, setCustomTextContent] = useState('');
  const [activeTab, setActiveTab] = useState<'files' | 'upload' | 'quickBackup'>('files');

  // Destructive delete confirmation modal
  const [fileToDelete, setFileToDelete] = useState<DriveFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getAccessToken().then((cached) => {
        if (cached) {
          setToken(cached);
          fetchFiles(cached);
        }
      });
    }
  }, [isOpen]);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setToken(res.accessToken);
        onAuthChange(res.user, res.accessToken);
        fetchFiles(res.accessToken);
        showToast('Berhasil terhubung ke akun Google Drive!');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal login dengan Google');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await logoutGoogle();
    setToken(null);
    setFiles([]);
    onAuthChange(null, null);
    showToast('Telah keluar dari akun Google.');
  };

  const fetchFiles = async (authToken?: string) => {
    const activeToken = authToken || token;
    if (!activeToken) return;

    setLoading(true);
    setErrorMessage(null);
    try {
      const data = await listDriveFiles(activeToken, searchQuery);
      setFiles(data);
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memuat file dari Google Drive');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFiles();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setIsUploading(true);
    setErrorMessage(null);
    try {
      await uploadFileToDrive(token, file.name, file, file.type || 'application/octet-stream');
      showToast(`File "${file.name}" berhasil diunggah ke Google Drive!`);
      fetchFiles();
      setActiveTab('files');
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal mengunggah file ke Google Drive');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleUploadCustomNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !customTextTitle.trim() || !customTextContent.trim()) return;

    setIsUploading(true);
    setErrorMessage(null);
    try {
      const name = customTextTitle.endsWith('.txt') ? customTextTitle : `${customTextTitle}.txt`;
      await uploadFileToDrive(token, name, customTextContent, 'text/plain');
      showToast(`Catatan "${name}" berhasil disimpan di Google Drive!`);
      setCustomTextTitle('');
      setCustomTextContent('');
      fetchFiles();
      setActiveTab('files');
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal menyimpan catatan');
    } finally {
      setIsUploading(false);
    }
  };

  const confirmDeleteFile = async () => {
    if (!token || !fileToDelete) return;

    setIsDeleting(true);
    setErrorMessage(null);
    try {
      await deleteDriveFile(token, fileToDelete.id);
      showToast(`File "${fileToDelete.name}" telah dihapus dari Google Drive.`);
      setFiles((prev) => prev.filter((f) => f.id !== fileToDelete.id));
      setFileToDelete(null);
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal menghapus file dari Google Drive');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <HardDrive className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base leading-none flex items-center gap-2">
                <span>Google Drive Integration</span>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                  Workspace
                </span>
              </h3>
              <p className="text-[11px] text-stone-500 mt-1">
                Kelola berkas, backup invoice, dan catatan suplemen langsung di Google Drive Anda
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Notification Toasts */}
          {successToast && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{successToast}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-900 text-xs rounded-xl flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Account Status / Sign In Area */}
          {!currentUser ? (
            <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100 shadow-xs">
                <HardDrive className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-stone-900 text-base">
                  Hubungkan Akun Google Drive
                </h4>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Masuk dengan akun Google Anda untuk menyimpan salinan invoice pesanan Hyper Trophy, riwayat pembelian, dan catatan program suplemen langsung ke cloud Drive pribadi Anda.
                </p>
              </div>

              {/* Official Google Sign-In button styling */}
              <button
                type="button"
                onClick={handleSignIn}
                disabled={loading}
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold rounded-xl border border-stone-300 shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{loading ? 'Menghubungkan...' : 'Sign in with Google'}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Connected User Card */}
              <div className="flex items-center justify-between p-3.5 bg-stone-100 rounded-xl border border-stone-200">
                <div className="flex items-center gap-3">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'User'}
                      className="w-9 h-9 rounded-full border border-stone-300"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                      {currentUser.displayName ? currentUser.displayName[0] : 'U'}
                    </div>
                  )}
                  <div>
                    <h5 className="font-bold text-stone-900 text-xs">
                      {currentUser.displayName || 'Pengguna Google'}
                    </h5>
                    <p className="text-[11px] text-stone-500 font-mono">{currentUser.email}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-3 py-1.5 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5 font-semibold cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar</span>
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-stone-200 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('files')}
                  className={`pb-2 text-xs font-bold transition-colors cursor-pointer border-b-2 px-1 ${
                    activeTab === 'files'
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Berkas Drive Saya ({files.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className={`pb-2 text-xs font-bold transition-colors cursor-pointer border-b-2 px-1 ${
                    activeTab === 'upload'
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Unggah Dokumen / Catatan
                </button>
              </div>

              {/* Tab: Files list */}
              {activeTab === 'files' && (
                <div className="space-y-3">
                  {/* Search Bar */}
                  <form onSubmit={handleSearchSubmit} className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari file di Google Drive..."
                        className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
                    >
                      Cari
                    </button>
                    <button
                      type="button"
                      onClick={() => fetchFiles()}
                      className="p-1.5 border border-stone-300 rounded-lg text-stone-600 hover:bg-stone-100"
                      title="Segarkan daftar file"
                    >
                      <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                  </form>

                  {/* Files List */}
                  {loading ? (
                    <div className="p-8 text-center text-xs text-stone-500">
                      <RefreshCw className="w-5 h-5 animate-spin mx-auto text-blue-600 mb-2" />
                      <span>Mengambil data dari Google Drive...</span>
                    </div>
                  ) : files.length === 0 ? (
                    <div className="p-8 text-center bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-500 space-y-2">
                      <FileText className="w-8 h-8 mx-auto text-stone-400" />
                      <p className="font-semibold text-stone-800">Tidak ada berkas yang cocok</p>
                      <p className="text-[11px]">Unggah berkas atau simpan invoice pesanan untuk melihatnya di sini.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden bg-white max-h-72 overflow-y-auto">
                      {files.map((file) => (
                        <div
                          key={file.id}
                          className="p-3 flex items-center justify-between gap-3 hover:bg-stone-50 transition-colors text-xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                            <div className="min-w-0">
                              <p className="font-bold text-stone-900 truncate">{file.name}</p>
                              <p className="text-[10px] text-stone-400">
                                {new Date(file.modifiedTime).toLocaleDateString('id-ID')}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {file.webViewLink && (
                              <a
                                href={file.webViewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 text-stone-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                title="Buka di Google Drive"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => setFileToDelete(file)}
                              className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                              title="Hapus file (dengan konfirmasi)"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Upload */}
              {activeTab === 'upload' && (
                <div className="space-y-4">
                  {/* File Upload Box */}
                  <div className="p-4 bg-stone-50 rounded-xl border border-dashed border-stone-300 text-center space-y-2">
                    <Upload className="w-6 h-6 mx-auto text-stone-500" />
                    <p className="text-xs font-semibold text-stone-800">
                      Unggah File dari Komputer/HP ke Google Drive
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Mendukung PDF, Gambar bukti transfer, atau dokumen lainnya
                    </p>
                    <label className="inline-block mt-1">
                      <span className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Pilih Berkas untuk Diunggah</span>
                      </span>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Create text note */}
                  <form onSubmit={handleUploadCustomNote} className="space-y-2.5 p-4 bg-white rounded-xl border border-stone-200">
                    <h5 className="font-bold text-xs text-stone-900">
                      Simpan Catatan Latihan / Program Suplemen ke Drive
                    </h5>
                    <input
                      type="text"
                      value={customTextTitle}
                      onChange={(e) => setCustomTextTitle(e.target.value)}
                      placeholder="Nama file (contoh: Jadwal_Minum_Evowhey.txt)"
                      className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    <textarea
                      rows={3}
                      value={customTextContent}
                      onChange={(e) => setCustomTextContent(e.target.value)}
                      placeholder="Tulis catatan menu makanan, target kalori, atau catatan latihan..."
                      className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    <button
                      type="submit"
                      disabled={isUploading || !customTextTitle || !customTextContent}
                      className="px-4 py-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      {isUploading ? 'Menyimpan...' : 'Simpan Catatan ke Google Drive'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <span className="flex items-center gap-1 text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            Akses aman Google OAuth 2.0
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>

      {/* Explicit User Confirmation Dialog for Destructive Delete (Mandatory Workspace Policy) */}
      {fileToDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h4 className="font-bold text-stone-900 text-sm">
                Konfirmasi Hapus Berkas dari Google Drive?
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Apakah Anda yakin ingin menghapus file{' '}
                <strong className="text-stone-900 font-semibold">"{fileToDelete.name}"</strong>? 
                Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setFileToDelete(null)}
                disabled={isDeleting}
                className="w-1/2 py-2 border border-stone-300 text-stone-700 text-xs font-bold rounded-lg hover:bg-stone-100 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDeleteFile}
                disabled={isDeleting}
                className="w-1/2 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
