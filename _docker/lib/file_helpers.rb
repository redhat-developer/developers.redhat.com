class FileHelpers
  def self.copy_if_changed(sourceFile, targetFile)
    unless FileUtils.identical?(sourceFile, targetFile)
      FileUtils.cp sourceFile, targetFile
    end
  end

  def self.open_or_new(path)
    if (File.exist?(path))
      File.open(path)
    else
      File.new(path, 'w')
    end
  end
end
